import axios from 'axios';

class Auth {
    constructor(selector, options) {
        this.selector = selector;
        this.$parent = document.querySelector(options.parent);
        this.$buttonActivate = document.querySelector(options.buttonActivate);
        this.action = 'auth';
        this.auth = 'auth';
        this.ajaxURL = options.ajaxURL;
        this.listenerBeforeRender();
    }

    getTemplate(auth) {
        if (auth === 'auth')  {
            return `
            <div class="${this.selector}__form">
                <button class="button ${this.selector}__close">
                    закрыть
                </button>
                <h3 class="${this.selector}__title">
                    <span class="${this.selector}-icon material-icons">
                        login
                    </span>
                    <span class="${this.selector}-title">Авторизация</span>
                </h3>
                <label class="field rounded">
                    <span class="field__title">Пользователь:</span>
                    <input name="login" class="field__input" type="text">
                    <span class="field__error"></span>
                </label>
                <label class="field rounded">
                    <span class="field__title">Пароль:</span>
                    <input name="password" class="field__input" type="password">
                    <span class="field__error"></span>
                </label>
                <div class="${this.selector}__error"></div>
                <div class="${this.selector}__buttons">
                    <button data-auth="auth" class="button
                    ${this.selector}__btn-auth active">
                        Войти
                    </button>
                    <button data-auth="reg" class="button
                    ${this.selector}__btn-reg">
                        Регистрация
                    </button>
                </div>
            </div>
            `
        } else {
            return `
            <div class="${this.selector}__form">
                <h3 class="${this.selector}__title">
                    <button class="button ${this.selector}__close">
                        закрыть
                    </button>
                    <span class="${this.selector}-icon material-icons">
                        assignment_ind
                    </span>
                    <span class="${this.selector}-title">Регистрация</span>
                </h3>
                <label class="field rounded">
                    <span class="field__title">Пользователь:</span>
                    <input name="login" class="field__input" type="text">
                    <span class="field__error"></span>
                </label>
                <label class="field rounded">
                    <span class="field__title">Пароль:</span>
                    <input name="password" class="field__input" type="password">
                    <span class="field__error"></span>
                </label>
                <label class="field rounded">
                    <span class="field__title">Повторный пароль:</span>
                    <input name="password2" class="field__input" type="password">
                    <span class="field__error"></span>
                </label>
                <div class="${this.selector}__error"></div>
                <div class="${this.selector}__buttons">
                    <button data-auth="auth" class="button
                    ${this.selector}__btn-auth">
                        Войти
                    </button>
                    <button data-auth="reg" class="button
                    ${this.selector}__btn-reg active">
                        Регистрация
                    </button>
                </div>
            </div>
            `
        }
    }

    render() {
        this.$auth = document.createElement('div')
        this.$auth.classList.add(this.selector)
        this.$auth.innerHTML = this.getTemplate(this.auth)
        this.$parent.insertAdjacentElement('afterBegin', this.$auth)
        this.listenerAfterRender()
    }

    listenerBeforeRender() {
        if (this.$buttonActivate) {
            this.$buttonActivate.addEventListener('click', () => {
                this.render();
            })
            document.body.addEventListener('click', (event) => {
                const el = event.target;
                if (el.className === this.selector
                    || el.className === `button ${this.selector}__close`) {
                    this.clear();
                }
            })
        }
    }

    listenerAfterRender() {
        this.$form = document.querySelector(`.${this.selector}__form`);
        this.$login = document.querySelector('input[name="login"]');
        this.$password = document.querySelector('input[name="password"]');
        if (this.auth === 'reg') {
            this.$password2 = document.querySelector('input[name="password2"]');
        }
        this.$buttonsAuth = document.querySelectorAll(`.${this.selector}__buttons button`);
        this.$buttonsAuth.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.auth === btn.dataset['auth']) {;
                    if (this.isValid()) this.ajaxAuth(this.auth)
                } else {
                    this.auth = btn.dataset['auth'];
                    this.$auth.innerHTML = this.getTemplate(this.auth);
                    this.listenerAfterRender();
                }
            })
        })
    }

    isValid() {
        const invalid = [];
        const inputs = this.$form.querySelectorAll('input');
        inputs.forEach(input => {
            const errorEl = input.nextElementSibling;
            function clearError() {
                errorEl.style.display = 'none';
                errorEl.textContent = '';
            }

            if (input.value === '') {
                errorEl.style.display = 'block';
                errorEl.textContent = 'Введите значение';
                invalid.push(input);
            }
            else {
                clearError()
                if (input.name === 'login') {
                    if (input.value.length < 3 || input.value.length > 11) {
                        errorEl.style.display = 'block';
                        errorEl.textContent = 'От 3 до 11 символов';
                        invalid.push(input);
                    } else if (!/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i.test(input.value)) {
                        errorEl.style.display = 'block';
                        errorEl.textContent = 'Недопустимый формат';
                        invalid.push(input);
                    }
                    else {
                        clearError();
                    }
                }
                if (input.name === 'password') {
                    if (input.value.length < 4 || input.value.length > 20) {
                        errorEl.style.display = 'block';
                        errorEl.textContent = 'От 4 до 20 символов';
                        invalid.push(input);
                    } else if (/[<>()[]]/i.test(input.value)) {
                        errorEl.style.display = 'block';
                        errorEl.textContent = 'Недопустимый формат';
                        invalid.push(input);
                    } else {
                        clearError();
                    }
                }

                if (input.name === 'password2') {
                    if (input.value !== this.$password.value) {
                        errorEl.style.display = 'block';
                        errorEl.textContent = 'Не совпадает';
                        invalid.push(input);
                    } else {
                        clearError();
                    }
                }
            }
        })

        return !invalid.length;
    }

    ajaxAuth(auth) {
        let body = new FormData();
        body.append('action', this.action);
        body.append('type', this.auth);
        body.append('login', this.$login.value);
        body.append('password', this.$password.value);
        if (this.$password2) {
            body.append('password2', this.$password2.value)
        }

        axios.post(this.ajaxURL, body)
            .then((response) => {
                const data = response.data;
                if (data === 'auth') {
                    document.location.href = `/`;
                } else {
                    const $authError = document.querySelector(`.${this.selector}__error`);
                    $authError.textContent = data;
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    clear() {
        this.$auth.remove();
    }
}

export default Auth;
