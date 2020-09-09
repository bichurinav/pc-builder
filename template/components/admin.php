<div class="admin-panel">
    <div class="container">
        <div class="admin-panel__inner">
            <h1>Admin Panel</h1>
            <div class="form-add-component">
                <h3 class="form-add-component__title">
                    <!-- Добавление компонента -->
                </h3>
                <form class="form-add-component__form" method="POST" action="/modules/Component.php">
                    <select class="select" name="component" id="">
                        <?foreach($arrComponentList as $key => $item):?>
                            <option value="<?=$key?>"><?=$item['name']?></option>
                        <?endforeach?>
                    </select>
                    <label class="field line" for="field_1">
                        <span class="field__title">Название</span>
                        <input id="field_1" class="field__input" name="name" placeholder="Название" type="name">
                    </label>
                    <label class="field line" for="field_2">
                        <span class="field__title">Цена</span>
                        <input id="field_2" class="field__input" name="price" placeholder="Цена" type="number">
                    </label>
                    <button class="btn form-add-component__btn">Добавить компонент</button>
                </form>
            </div>
        </div>
    </div>
</div>