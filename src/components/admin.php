<div class="admin-panel admin-panel_active">
    <div class="container">
        <div class="admin-panel__inner">
            <div class="admin-panel__open">&#10006;</div>
            <!-- ./admin-panel__open -->
            <div class="form-add-component">
                <form id="form-add-component" class="form-add-component__form">  
                    <select id="form-add-component-select" class="select" name="component" id="">
                        <?foreach($arrComponentList as $key => $item):?>
                            <?if($key === $_GET['component']):?>
                                <option value="<?=$key?>" selected><?=$item['name']?></option>
                            <?else:?>
                                <option value="<?=$key?>"><?=$item['name']?></option>
                            <?endif?>
                        <?endforeach?>
                    </select>
                    <!-- ./select-component -->
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
                            <input type="file" name="image" id="form-add-component-upload" class="upload-file__input" accept="image/jpeg,image/png,image/gif">
                            <label class="upload-file__label" for="form-add-component-upload">
                                <img class="upload-file__icon" src="<?=TEMPLATE_PATH . 'images/picture_icon.svg'?>" alt="">
                                <span class="upload-file__text">Изображение</span>
                            </label>
                        </div>
                        <!-- ./upload-file (image) -->
                        <button class="btn form-add-component__btn">
                            Добавить <?=$arrComponentList[$_GET['component']]['genetive']?>
                        </button>
                        <!-- ./form-add-component__btn -->
                    </div>
                    <!-- ./form-add-component__body -->
                </form>
                <!-- ./form-add-component__form -->
            </div>
            <!-- ./form-add-component -->
        </div>
        <!-- ./admin-panel__inner -->
    </div>
    <!-- ./container -->
</div>
<!-- ./admin-panel -->