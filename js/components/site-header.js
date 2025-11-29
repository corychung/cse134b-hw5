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