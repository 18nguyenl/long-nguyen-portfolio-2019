import Highway from '@dogstudio/highway';

class HomeRenderer extends Highway.Renderer {
    onEnter() {
        console.log("page entered")
    }

    onLeave() {
        console.log("page left")
    }
}

export default HomeRenderer;