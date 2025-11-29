class themePicker extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

    }
    
    connectedCallback() {
        this.shadowRoot.innerHTML = `
<style>
button {
    justify-self: end;
    background: none;
    cursor: pointer;
    border: none;
    text-align: right;
    width:fit-content;
    padding:0.5rem;
    svg path {
        stroke: var(--heading-text-color, black);
        fill: none;
    }
    svg path:hover {
        stroke: var(--text-color-hover, black);
    }
}
dialog {
    margin: auto;
    text-align: center;
    padding: 1rem 2rem;
    color: var(--heading-text-color, black);
    background-color: var(--background-color, white);
    border: var(--border-settings, 1px solid black);
    border-radius: var(--border-radius, 0.5rem);
    header {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        border: none;
    }
    form {   
        display: block;
        flex-direction: column;
        gap: 1rem;
    }
    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        border: none;
        padding: 1rem 0rem 1rem;
    }
    button {
        justify-self: center;
        background-color: var(--heading-text-color, black);
        text-decoration: none;
        color: var(--background-color, white);
        padding: 0.5rem;
        border-radius: var(--border-radius, 0.5rem);
        border: none;
        font-family: 'Satoshi', Tahoma, Geneva, Verdana, sans-serif;
        &:hover{
            background-color: var(--text-color-hover, black);
        }
        &:active {
            background-color: var(--text-color-active, black);
        }
    }
} 
</style>

<button id="theme-picker" commandfor="themeDialog" command="show-modal" aria-label="Pick a theme" hidden>
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 8.5H15.51M10.5 7.5H10.51M7.5 11.5H7.51M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 13.6569 19.6569 15 18 15H17.4C17.0284 15 16.8426 15 16.6871 15.0246C15.8313 15.1602 15.1602 15.8313 15.0246 16.6871C15 16.8426 15 17.0284 15 17.4V18C15 19.6569 13.6569 21 12 21ZM16 8.5C16 8.77614 15.7761 9 15.5 9C15.2239 9 15 8.77614 15 8.5C15 8.22386 15.2239 8 15.5 8C15.7761 8 16 8.22386 16 8.5ZM11 7.5C11 7.77614 10.7761 8 10.5 8C10.2239 8 10 7.77614 10 7.5C10 7.22386 10.2239 7 10.5 7C10.7761 7 11 7.22386 11 7.5ZM8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</button>

<!-- Theme Picker Dialog -->
<dialog id="themeDialog">
    <header>
        <h3>Pick a theme!</h3>
    </header>
    <form>
        <input id="light" name="theme" type="radio" data-theme="light" checked></input>
        <label for="light">Light</label>
        <br>
        <input id="dark" name="theme" type="radio" data-theme="dark"></input>
        <label for="dark">Dark</label>
    </form>
    <footer>
        <button commandfor="themeDialog" command="close">Close</button>
    </footer>
</dialog>
        `;

        const toggle = this.shadowRoot.querySelector("#theme-picker");
        const dark = this.shadowRoot.querySelector("#dark");
        const light = this.shadowRoot.querySelector("#light");
        toggle.hidden = false;

        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "light");
        }
        const savedTheme = localStorage.getItem("theme");
        setTheme(savedTheme ? savedTheme : "light");

        this.shadowRoot.querySelector(`#${savedTheme}`).checked = true;

        let selectedTheme = "light";
        function setTheme(theme) {
            document.documentElement.setAttribute("data-theme", theme);
        }

        light.addEventListener("change", () => {
            selectedTheme = "light";
            setTheme("light");
            localStorage.setItem("theme", selectedTheme);
            console.log("LIGHT");
        });

        dark.addEventListener("change", () => {
            selectedTheme = "dark";
            setTheme("dark");
            localStorage.setItem("theme", selectedTheme);
            console.log("DARK");
        });
    }
}

customElements.define("theme-picker", themePicker); 
