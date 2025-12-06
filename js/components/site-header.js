import "/js/components/theme-picker.js"

class siteHeader extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

    }
    
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: var(--background-color, white);
                    border-bottom: var(--border-settings, 1px solid black);
                    width: 100%;
                    margin-bottom: 2rem;

                    /* Hide burger menu by default on desktop */
                    #burger-menu {
                        display: none;
                    }
                    .logo {
                        font-family: "Clash Display", Tahoma, Geneva, Verdana, sans-serif;
                        font-weight: 600;
                        font-size: 1.5rem;
                        text-decoration: none;
                        color: var(--heading-text-color, black);
                        width:fit-content;
                    }
                    .logo:hover {
                        color:  var(--text-color-hover, black);
                    }
                    nav {
                        display: grid;
                        grid-template-columns: 1fr auto 1fr;
                        align-items: center;
                        justify-content: space-around;
                        padding: 0.5rem 2rem;
                        ul {
                            list-style: none;
                            position: static;
                            display: flex;
                            gap: 2rem;
                            width: 100%;
                            border: none;
                            background-color: var(--background-color, white);
                            a {
                                text-decoration: none;
                                color: var(--heading-text-color, black);
                                font-weight: 500;
                                font-family: "Clash Display";
                            }
                            a:hover {
                                color: var(--text-color-hover, black);
                            }                                
                        }
                    }
                    theme-picker {
                        justify-self:end;
                    }
                }
                
                @media only screen and (max-width: 600px) {
                    /* Mobile menu navbar */
                    header {
                        #burger-menu {
                            display: inline-block;
                            text-align:left;
                            color: var(--heading-text-color, black);
                            font-weight: 500;
                            font-family: "Clash Display";
                            font-size: 1rem;
                            background: none;
                            color: inherit;
                            border: none;
                            padding: 0.5rem;
                            cursor: pointer;
                        }
                        nav {
                            grid-template-columns: auto;
                            justify-self: start;
                            ul[popover] {
                                flex-direction: column;
                                gap: 1rem;
                                display: none;
                                transition: opacity 0.25s ease, transform 0.25s ease;
                                opacity: 0;
                                transform: translateY(-10px);
                            }
                            ul[popover]:popover-open {
                                margin: 0;
                                display: flex;
                                padding: 2rem;
                                border-bottom: var(--border-settings, 1px solid black);

                                /* Animate popover menu opening */
                                opacity: 1;
                                transform: translateY(0);
                                li {
                                    width: 100%;
                                }
                                @starting-style {
                                    opacity: 0;
                                    transform: translateY(-10px);
                                }
                            }
                        }
                        .logo {
                            display: none;
                        }
                        /* Remove theme picker since "commandfor" which it uses is not widely supported on mobile yet */
                        theme-picker {
                            display: none;
                        }
                    }
                }
            </style>

            <header>
                <nav>
                    <a href="index.html" class="logo">CC</a>
                    <button id="burger-menu" popovertarget="mypopover">Menu</button>
                    <ul id="mypopover" popover>
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="/projects.html">Projects</a></li>
                        <li><a href="/contact.html">Contact</a></li>
                        <li><a href="/about.html">About</a></li>
                    </ul>
                    <theme-picker></theme-picker>
                </nav>
            </header>
        `;
    }
}

customElements.define("site-header", siteHeader);