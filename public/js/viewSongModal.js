const $ = document.querySelector.bind(document);

const openDeleteModal = function () {
	$(".delete-overlay").classList.add("active");
	$("body").classList.add("modal-open");
};
const closeDeleteModal = function () {
	$(".delete-overlay").classList.remove("active");
	$("body").classList.remove("modal-open");
};

const deleteHandler = function () {};
document.addEventListener("DOMContentLoaded", () => {
	$(".btn-delete-modal").addEventListener("click", openDeleteModal);
	$(".delete-btn--cancel").addEventListener("click", closeDeleteModal);
});
