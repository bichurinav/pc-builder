export function addComponent(action, form, url) {
    let body = new FormData(form);
    body.append('action', action);
    const req = fetch(url, {
        method: 'POST',
        body
    })
    req.then(data => data.text()).then(data => {
        const fields = document.querySelectorAll('.field input');
        fields.forEach(el => {
            el.value = '';
        })
        if (!data) {
            return
        }
        setTimeout(() => {
            document.location.href = `/?component=${data}`;
        }, 0);
    })
}