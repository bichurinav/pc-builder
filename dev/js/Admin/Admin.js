import Add from './Add';

class Admin {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.ajaxURL = options.ajaxURL;
        if (this.$el) {
            new Add(this.$el, this.ajaxURL);
        }
    }
}

export default Admin;
