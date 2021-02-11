export const Action = Object.freeze({
    OpenMenu: 'OpenMenu',
    CloseMenu: 'CloseMenu',
});

export function closeMenu() {
    return {
        type: Action.CloseMenu,
        payload: false,
    }
}

export function openMenu() {
    return {
        type: Action.OpenMenu,
        payload: false,
    }
}