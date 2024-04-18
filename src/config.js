export const API_BASE_URI = 'http://localhost:8000'
//export const API_BASE_URI = 'https://movie-detectives.com/api'

export const PARTICLE_SETTINGS = {
    fpsLimit: 60,
    particles: {
        number: {
            value: 0
        },
        color: {
            value: "#f00"
        },
        shape: {
            type: ["circle", "square", "polygon"],
            options: {
                polygon: {
                    sides: 6
                }
            }
        },
        opacity: {
            value: {min: 0, max: 1},
            animation: {
                enable: true,
                speed: 1,
                startValue: "max",
                destroy: "min"
            }
        },
        size: {
            value: {min: 3, max: 7}
        },
        life: {
            duration: {
                sync: true,
                value: 7
            },
            count: 1
        },
        move: {
            enable: true,
            gravity: {
                enable: true
            },
            drift: {
                min: -2,
                max: 2
            },
            speed: {min: 10, max: 30},
            decay: 0.1,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
                default: "destroy",
                top: "none"
            }
        },
        rotate: {
            value: {
                min: 0,
                max: 360
            },
            direction: "random",
            move: true,
            animation: {
                enable: true,
                speed: 60
            }
        },
        tilt: {
            direction: "random",
            enable: true,
            move: true,
            value: {
                min: 0,
                max: 360
            },
            animation: {
                enable: true,
                speed: 60
            }
        },
        roll: {
            darken: {
                enable: true,
                value: 25
            },
            enable: true,
            speed: {
                min: 15,
                max: 25
            }
        },
        wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
                min: -15,
                max: 15
            }
        }
    },
    detectRetina: true,
    emitters: {
        direction: "none",
        spawnColor: {
            value: "#ff0000",
            animation: {
                h: {
                    enable: true,
                    offset: {
                        min: -1.4,
                        max: 1.4
                    },
                    speed: 0.1,
                    sync: false
                },
                l: {
                    enable: true,
                    offset: {
                        min: 20,
                        max: 80
                    },
                    speed: 0,
                    sync: false
                }
            }
        },
        life: {
            count: 0,
            duration: 0.1,
            delay: 0.6
        },
        rate: {
            delay: 0.1,
            quantity: 100
        },
        size: {
            width: 0,
            height: 0
        }
    }
}
