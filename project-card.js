class projectCard extends HTMLElement {
    
    constructor() {
        super();
    }

    
    connectedCallback() {
        console.log("Added");
    }
    
    disconnectedCallback() {
        console.log("Removed");
    }
    
}

customElement.define("project-card", projectCard);