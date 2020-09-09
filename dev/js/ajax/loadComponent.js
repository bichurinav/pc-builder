export function loadComponent(action, url) {
    function $_GET(key) {
        var p = window.location.search;
        p = p.match(new RegExp(key + '=([^&=]+)'));
        return p ? p[1] : false;
    }
    let body = new FormData();
    body.append('action', action);
    body.append('component', $_GET('component'))
    const req = fetch(url, {
        method: 'POST',
        body
    })
    req.then(data => data.json()).then(data => {
        const catalog = document.querySelector('.catalog-content')
        catalog.innerHTML = '';

        if (!data) {
            catalog.innerHTML = "<b>Пусто :(</b>"
            return
        }

        data['items'].forEach(item => {
            catalog.innerHTML += `
            <div class="catalog-content__item">
                <b>${item['name']}:</b>
                <span>${item['price']} руб.</span>
            </div>
            `
        })
    })
}