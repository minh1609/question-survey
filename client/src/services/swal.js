import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

let MySwal = withReactContent(Swal);

export const DefaultPopUp = MySwal.mixin({
    buttonsStyling: false,
    customClass: {
        confirmButton: "btn btn-primary mx-1",
        cancelButton: "btn btn-secondary mx-1"
    },
    showCancelButton: true
});

export const AuthPopUp = DefaultPopUp.mixin({
    type: "error",
    title: "You are not authorize"
});
