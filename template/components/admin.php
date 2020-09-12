<div class="admin-panel">
    <div class="container">
        <div class="admin-panel__inner">
            <h1>Admin Panel</h1>
            <div class="form-add-component">
                <h3 class="form-add-component__title">
                    <!-- Добавление компонента -->
                </h3>
                <form class="form-add-component__form">
                    <select id="addComponentSelect" class="select" name="component" id="">
                        <?foreach($arrComponentList as $key => $item):?>
                            <?if($key === $_GET['component']):?>
                                <option value="<?=$key?>" selected><?=$item['name']?></option>
                            <?else:?>
                                <option value="<?=$key?>"><?=$item['name']?></option>
                            <?endif?>
                        <?endforeach?>
                    </select>
                    <div class="form-add-component__body">
                        <?$fields = $arrComponentList[$_GET['component']]['params'];?>
                        <?foreach($fields as $name => $field):?>
                            <label class="field line" for="field_<?=$name?>">
                                <span class="field__title"><?=$field['title']?></span>
                                <input id="field_<?=$name?>" class="field__input"
                                 name="<?=$name?>" placeholder="<?=$field['title']?>" type="<?=$field['type']?>">
                                 <span class="field__error">введите значение</span>
                        </label>
                        <?endforeach?>
                        <div class="upload-file">
                            <input type="file" name="image" id="upload-file__input" class="upload-file__input" accept="image/jpeg,image/png,image/gif">
                            <label class="upload-file__label" for="upload-file__input">
                                <img class="upload-file__icon" src="<?=TEMPLATE_PATH . 'images/picture_icon.svg'?>" alt="">
                                <span class="upload-file__text">Изображение</span>
                            </label>
                        </div>
                        <button class="btn form-add-component__btn">Добавить <?=$arrComponentList[$_GET['component']]['genetive']?></button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>