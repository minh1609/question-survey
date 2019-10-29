import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

let MySwal = withReactContent(Swal);
MySwal = MySwal.mixin({
    buttonsStyling: false,
    customClass: {
        confirmButton: "btn btn-primary mx-1",
        cancelButton: "btn btn-secondary mx-1"
    },
    showCancelButton: true
});

export default MySwal;
