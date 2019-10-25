import Highway from '@dogstudio/highway';

class DefaultRenderer extends Highway.Renderer {
    onEnter() {
        
    }

    onLeave() {
        console.log("page left")
    }
}

export default HomeRenderer;