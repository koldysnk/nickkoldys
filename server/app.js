const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const { response } = require('express');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json','utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function hasWhiteSpace(s) {
    return /\s/g.test(s);
}

function rowToObjectWord(row){
    return {
        id: row.id,
        word: row.word,
        length: row.length,
        weight: row.weight,
        difficulty: row.difficulty,
        won: row.won,
        played: row.played,
    };
}

function rowToObjectAccount(row){
    return {
        id: row.id,
        username: row.username,
        created: row.created,
        score: row.score,
        games_won: row.games_won,
        games_lost: row.games_lost,
        games_played: row.games_played,
    };
}

app.get('/fullDictionary', (request, response)=>{
    const query  = 'SELECT * FROM dictionary';
    connection.query(query, [], (error, rows)=>{
        response.send({
            ok:true,
            words:rows.map(rowToObjectWord),
        });
    });
});

app.get('/words/:length/:difficulty', (request, response)=>{
    const query  = 'SELECT * FROM dictionary WHERE length = ?  AND (difficulty = 0 OR difficulty = ?)';
    const params = [request.params.length, request.params.difficulty];
    connection.query(query, params,(error, rows)=>{
        response.send({
            ok:true,
            words:rows.map(rowToObjectWord),
        });
    });
});

app.get('/guessLetter/:length/:regex/:guessed', (request, response)=>{
    const guessed = request.params.guessed;
    
    let frequency = new Map();
    for (let i =97; i<=122;i++){
        frequency.set(String.fromCharCode(i),0);
    }


    const query  = 'SELECT * FROM dictionary WHERE length = ?  AND word REGEXP ?';
    const params = [request.params.length, request.params.regex];
    connection.query(query, params,(error, rows)=>{
        const words = rows.map(rowToObjectWord);
        for(let i=0; i < words.length; i++){
            const word = words[i];
            const w = String.prototype.concat(...new Set(word.word));
            for (let letter of w){
                if(!guessed.includes(letter)){
                    frequency.set(letter,frequency.get(letter)+(1*parseInt(word.weight)));
                }
            }
        }

        let curr = [];
        let currMax = 0;
        for(let i =97; i<=122; i++){
            let s = String.fromCharCode(i);
            let f = frequency.get(s);
            if (f===currMax){
                curr.push(s);
            }else if(f>currMax){
                curr = [s];
                currMax = f;
            }
            
        }
        const rand = Math.floor(Math.random() * curr.length);
        response.send({
            ok:true,
            guess:curr[rand],
        });
    });
});

app.get('/randWord/:length/:difficulty', (request, response)=>{
    const query  = 'SELECT * FROM dictionary WHERE length = ?  AND (difficulty = 0 OR difficulty = ?) ORDER BY RAND() LIMIT 1';
    const params = [request.params.length, request.params.difficulty];
    connection.query(query, params,(error, rows)=>{
        response.send({
            ok:true,
            word:rowToObjectWord(rows[0]),
        });
    });
});

app.get('/checkAccount/:username',(request,response)=>{
    const query = 'SELECT username FROM accounts WHERE username = ? LIMIT 1';
    const params = [request.params.username];
    connection.query(query, params,(error, rows)=>{
        const nameExists = rows.map(rowToObjectAccount);
        const exists = nameExists.length > 0;
        
        response.send({
            ok:true,
            usernameExists:exists,
        });
    });
});

app.get('/account/:username/:password/', (request, response)=>{
    const query  = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
    const params = [request.params.username, request.params.password];
    connection.query(query, params,(error, rows)=>{
        const accounts = rows.map(rowToObjectAccount)
        if (accounts.length==1){
            response.send({
                ok:true,
                account:accounts[0],
            });
        }else{
            response.send({
                ok:false,
                message:"Incorrect username or password.",
            });
        }
    });
});

app.get('/highscores', (request, response)=>{ 
    const query = 'SELECT * FROM accounts ORDER BY score DESC LIMIT 10';
    connection.query(query, [],(error, rows)=>{
        response.send({
            ok:true,
            highscores:rows.map(rowToObjectAccount),
        });
    });
});

app.get('/allwords/:offset/:limit', (request, response)=>{ 
    const query = 'SELECT * FROM dictionary LIMIT ?, ?';
    const params = [parseInt(request.params.offset), parseInt(request.params.limit)];
    connection.query(query, params,(error, rows)=>{
        response.send({
            ok:true,
            dictionary:rows.map(rowToObjectWord),
        });
    });
});

app.get('/mostgameswon', (request, response)=>{ 
    const query = 'SELECT * FROM accounts ORDER BY games_won DESC LIMIT 10';
    connection.query(query, [],(error, rows)=>{
        response.send({
            ok:true,
            highscores:rows.map(rowToObjectAccount),
        });
    });
});

app.get('/mostgameslost', (request, response)=>{ 
    const query = 'SELECT * FROM accounts ORDER BY games_lost DESC LIMIT 10';
    connection.query(query, [],(error, rows)=>{
        response.send({
            ok:true,
            highscores:rows.map(rowToObjectAccount),
        });
    });
});

app.get('/mostgamesplayed', (request, response)=>{ 
    const query = 'SELECT * FROM accounts ORDER BY games_played DESC LIMIT 10';
    connection.query(query, [],(error, rows)=>{
        response.send({
            ok:true,
            highscores:rows.map(rowToObjectAccount),
        });
    });
});

app.get('/wordLost/:word/', (request, response)=>{
    const wordText = request.params.word.toLowerCase();
    const query = 'SELECT * FROM dictionary WHERE word = ?';
    const params = [wordText];
    connection.query(query, params,(error, rows)=>{
        const word = rows.map(rowToObjectWord);
        if (word.length!==1){
            response.send({
                ok:false,
                message:"The word you picked does not exist in our dictionary.",
            });
        }else{
            const weight = parseInt(word[0].weight)+1;
            const played = parseInt(word[0].played)+1;
            
            const query2 = 'UPDATE dictionary SET weight=?, played=? WHERE word=?';
            const params2 = [weight, played, wordText];
            connection.query(query2, params2,(error, rows)=>{
                response.send({
                    ok:true,
                    message:"Weight updated.",
                });
                
            });
        }
    });
});

app.get('/wordWon/:word/', (request, response)=>{
    const query = 'SELECT * FROM dictionary WHERE word = ?';
    const params = [request.params.word];
    connection.query(query, params,(error, rows)=>{
        const word = rows.map(rowToObjectWord);
        if (word.length!==1){
            response.send({
                ok:false,
                message:"The word you picked does not exist in our dictionary.",
            });
        }else{
            const won = parseInt(word[0].won)+1;
            const played = parseInt(word[0].played)+1;
            
            const query2 = 'UPDATE dictionary SET won=?, played=? WHERE word=?';
            const params2 = [won, played, request.params.word];
            connection.query(query2, params2,(error, rows)=>{
                response.send({
                    ok:true,
                    message:"played updated.",
                });
                
            });
        }
    });
});

app.get('/addAccount/:username/:p1/:p2/', (request, response)=>{
    const username = request.params.username;
    const p1 = request.params.p1;
    const p2 = request.params.p2;
    if(hasWhiteSpace(username)){
        response.send({
            ok:false,
            message:"Your username cannot include spaces.",
        });
    }else if(hasWhiteSpace(p1)){
        response.send({
            ok:false,
            message:"Your password cannot include spaces.",
        });
    }else if(p1!==p2){
        response.send({
            ok:false,
            message:"Your passwords must match.",
        });
    }else{
        const query = 'SELECT username FROM accounts WHERE username = ? LIMIT 1';
        const params = [username];
        connection.query(query, params,(error, rows)=>{
            const nameExists = rows.map(rowToObjectAccount);
            const exists = nameExists.length > 0;
            if(exists){
                response.send({
                    ok:false,
                    message:`The username "${username}" is taken.`,
                });
            }else{
                const query  = 'INSERT INTO accounts(username, password) VALUES (?, ?)';
                const params = [username, p1];
                connection.query(query, params,(error, result)=>{
                    response.send({
                        ok:true,
                        id:result.insertId,
                    });
                });
            }
        });
    }
});

app.get('/updateAccount/:username/:games_won/:games_played/:games_lost/:score/', (request, response)=>{
    const username =  request.params.username;
    const games_won =  request.params.games_won;
    const games_played =  request.params.games_played;
    const games_lost =  request.params.games_lost;
    const score = request.params.score;
    const params = [score, games_won, games_played, games_lost, username];
    const query = 'UPDATE accounts SET score= ?, games_won=?, games_played=?, games_lost=? WHERE username=?';
    connection.query(query, params,(error, result)=>{
        response.send({
            ok:true,
        });
    });
});

app.get('/updateDictionary/:word/:played/:won/:difficulty/:weight/', (request, response)=>{
    const word =  request.params.word;
    const played =  request.params.played;
    const won =  request.params.won;
    const difficulty =  request.params.difficulty;
    const weight = request.params.weight;
    const params = [played, won, difficulty, weight, word];
    const query = 'UPDATE dictionary SET played=?, won=?, difficulty=? , weight=? WHERE word=?';
    connection.query(query, params,(error, result)=>{
        response.send({
            ok:true,
        });
    });
});

const port = 3443;
app.listen(port, () => {
    console.log(`Live on port ${port}`);
});