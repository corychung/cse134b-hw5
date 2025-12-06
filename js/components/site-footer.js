class siteFooter extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

    }
    
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: var(--background-color, white);
                    border-top: var(--border-settings, 1px solid black);
                    width: 100%;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 1rem;
                    p {
                        font-family: "Clash Display", Tahoma, Geneva, Verdana, sans-serif;
                        font-weight: 400;
                    }
                }
            </style>
            <footer>
                <p>&copy; Cory Chung 2025</p>
            </footer>

        `;
    }
}

customElements.define("site-footer", siteFooter);