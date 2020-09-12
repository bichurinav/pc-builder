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

        data['items'].forEach((item, index, arr) => {
            let params = []
            for (let key in item) {
                if (key !== 'name' && key !== 'id' && key !== 'image') {

                    params.push(`<span><b>${key.replaceAll('_', ' ')}</b>: ${item[key]}</span><br>`);
                }
            }
            catalog.innerHTML += `
            <div class="catalog-content__item">
                <h2>${item['name']}</h2>
                <br>
                <div>
                    ${params.join('')}
                </div>
                <div>
                    <img width="300" src="${item['image']}">
                </div>
            </div>
            `
        })
    })
}