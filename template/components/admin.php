<div class="admin-panel">
    <div class="container">
        <div class="admin-panel__inner">
            <h1>Admin Panel</h1>
            <div class="form-add-component">
                <h3 class="form-add-component__title">
                    Добавление компонента
                </h3>
                <form class="form-add-component__form" action="">
                    <select name="" id="">
                        <?foreach($arrComponentList as $key => $name):?>
                            <option value="<?=$key?>"><?=$name?></option>
                        <?endforeach?>
                    </select>
                    <label class="field" for="field_1">
                        <span class="field__title">Название</span>
                        <input id="field_1" class="field__input" type="name" placeholder="">
                    </label>
                    <label class="field" for="field_2">
                        <span class="field__title">Цена</span>
                        <input id="field_2" class="field__input" type="number" placeholder="">
                    </label>
                    <button class="btn">Добавить</button>
                </form>
            </div>
        </div>
    </div>
</div>