import Add from './Add'

class Admin {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.ajaxURL = options.ajaxURL
        if (this.$el) {
            this.add = new Add(this.$el, this.ajaxURL);
        }
    }
}

export default Admin;
