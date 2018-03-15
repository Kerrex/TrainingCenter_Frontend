import { NotificationUtils } from './notification.utils';
import { FormGroup } from "@angular/forms/src/model";

declare var $: any;

export class FormUtils {
    /**
     * Sometimes Material Design doesn't delete "is-empty" class by itself.
     * This method is used to do it instead. 
     */
    static removeIsEmpty() {
        let formGroups = $('.form-group');
        formGroups.each((index, fg) => {
            let formGroup = $(fg);
            formGroup.removeClass('is-empty');
        });
    }

    static validateFormAndNotify(formGroup: FormGroup): boolean {
        if (!formGroup.valid) {
            Object.keys(formGroup.controls).forEach(key => {
                formGroup.get(key).markAsDirty();
            });
            NotificationUtils.showNotification("top", "right", NotificationUtils.DANGER, "notifications", "Wypełnij wymagane pola");
            return false;
        }
        return true;
    }
}