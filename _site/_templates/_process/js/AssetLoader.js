/**
*   Add any promises that need to be resolved before showing
*   the page by using the add( promise ) method.
*/

const AssetLoader = {

    // The stuff we're gonna load
    promisesToLoad: [],
    
    load( { element = document.body, progress = false } = {} ) {
        
        // The root node that has all the stuff (img, video, foreign stuff) we're gonna load
        this.element = element
        // Push any images or videos to load
        this.addMedia()
        
        return this.loaded = new Promise( resolve => {
            // We wanna track the progress
            if( progress ) {
                
                this.progressPromise( this.promisesToLoad, progress ).then( () => {
                    this.promisesToLoad = []
                    resolve()
                })
                
            } else {
                // After all the promises, clear the loading stuff out
                Promise.all( this.promisesToLoad ).then( () => {
                    this.promisesToLoad = []
                    resolve()
                })
            }
        })
    },
    
    // For foreign promises not img, video, etc.
    add( promise ) {
        this.promisesToLoad.push( promise )
    },
    
    // Find the images and videos and load them as promises
    addMedia() {
        
        // Find all images and wrap their loading as a promise
        const images = this.element.querySelectorAll('img')
        for( let i = 0; i < images.length; i++ ) {
            
            this.promisesToLoad.push( new Promise( resolve => {
                
                const imgEl = document.createElement('img')
                imgEl.addEventListener('load', resolve )
                imgEl.addEventListener('error', resolve )
                imgEl.src = images[i].src
                
            }) )
        }
                
        // Find all videos and wrap their loading as a promise
        const videos = this.element.querySelectorAll('video')
        for( let i = 0; i < videos.length; i++ ) {
            
            this.promisesToLoad.push( new Promise( resolve => {
                
                const videoEl = document.createElement('video')
                videoEl.addEventListener('loadedmetadata', resolve )
                videoEl.addEventListener('error', resolve )
                videoEl.src = videos[i].src
                
            }) )
        }

        // TODO: check background images
    },
    
    // The actual loading of things, but with progress metadata
    progressPromise( promises, tickCallback ) {
        
        let len = promises.length
        let progress = 0
        
        function tick( promise ) {

            promise.then(function () {
                progress++
                tickCallback(progress, len) // so you can do some percentage fractional based magic
            }).catch(reason => { // the oopsies from the promise
                console.log(reason)
            })
            
            // When we're done, let's reuse this thing
            return promise

        }
        
        // Run each promise in tick
        return Promise.all(promises.map(tick))
        
    }
    
}

export default AssetLoader