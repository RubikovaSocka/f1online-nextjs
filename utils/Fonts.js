import FontFaceObserver from 'fontfaceobserver'

const Fonts = () => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css?family=Cabin:400,600,700'
    link.rel = 'stylesheet'

    document.head.appendChild(link)

    const roboto = new FontFaceObserver('Cabin')

    roboto.load().then(() => {
        document.documentElement.classList.add('cabin')
    })
}

export default Fonts