const state = {
    RU: {
        play: 'Играть',
        events: 'События',
        album: 'Альбом',
        top: 'Топ',
        about: 'Об игре'
    },
    EN: {
        play: 'Play',
        events: 'Events',
        album: 'Album',
        top: 'Top',
        about: 'About'
    }
}

const getters = {
    getLangLib: state => lang => { return state[lang] }
}

export default {
    namespaced: true,
    state,
    getters
}