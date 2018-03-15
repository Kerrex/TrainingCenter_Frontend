declare var $: any;
export class NotificationUtils {
    static INFO = "info";
    static SUCCESS = "success";
    static WARNING = "warning";
    static DANGER = "danger";

    static showNotification(from, align, type, icon, message) {
        $.notify({
            icon: icon,
            message: message
        },{
            type: type,
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    }
}