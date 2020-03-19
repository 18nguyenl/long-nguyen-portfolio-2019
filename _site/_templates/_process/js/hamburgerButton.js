import gsap from 'gsap';

export class HamburgerButton {
    constructor() {
        this.isMenuOpen = false;
        this.menuButton = document.getElementById("hamburger__decoration");
        this.navigation = document.getElementById("mNavigation");
        this.navContainer = document.querySelector(".mNavigation__content");
        this.navBackground = document.querySelector(".mNavigation__background");

        this.menuButton.addEventListener("click", this.onClick.bind(this));
    }
    
    onClick() {
        if (!this.isMenuOpen) {
            this.open();
        } else {
            this.close();
        }
    }

    open() {
        if (!this.isMenuOpen) {
            let timeline = gsap.timeline();

            this.navigation.classList.add("mNavigation--visible");
            this.menuButton.classList.add("hamburger__menu--exit");
            gsap.to(
                ".mNavigation__link > a",
                0.725,
                {
                    y: "0%",
                    ease: "power4.inOut",
                    stagger: 0.05
                },
            );
            gsap.to(this.navBackground, 1.125, {
                y: "100vh",
                ease: "power4.inOut"
            });
            timeline.to(this.navContainer, 0.8, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 0% 70%)",
                ease: "power4.in",
                stagger: 0.25
            });
            timeline.to(this.navContainer, 0.8, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power4.out",
                stagger: 0.25
            });

            this.isMenuOpen = true;
        }
    }

    close() {
        if (this.isMenuOpen) {
            let timeline = gsap.timeline();
            this.menuButton.classList.remove("hamburger__menu--exit");
            gsap.to(".mNavigation__link > a", 0.425, {
                y: "100%",
                ease: "power4.inOut",
                stagger: 0.05
            });

            timeline.to(this.navContainer, 0.6525, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 20%, 0% 40%)",
                ease: "power4.in",
                stagger: 0.25
            });
            timeline.to(this.navContainer, 0.6525, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                ease: "power4.out",
                stagger: 0.25
            }).then(() => {
                this.navigation.classList.remove("mNavigation--visible");
            });
            
            gsap.to(this.navBackground, 1.825, {
                y: "-100vh",
                ease: "power3.inOut"
            });

            this.isMenuOpen = false;
        }
    }
}

export  default new HamburgerButton();