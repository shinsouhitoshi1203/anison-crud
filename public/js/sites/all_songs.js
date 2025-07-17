const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

const openDeleteModal = function () {
	$(".delete-overlay").classList.add("active");
	$("body").classList.add("modal-open");
};
const closeDeleteModal = function () {
	$(".delete-overlay").classList.remove("active");
	$("body").classList.remove("modal-open");
};

document.addEventListener("DOMContentLoaded", () => {
	const lists = {};

	const selectAllDOM = $("#select-all-songs");
	const songItems = $$(".song__checkbox-input");
	const deleteSelected = $(".delete-selected");
	const form = $(".confirm-delete-form");

	const orderSongButtons = $$(".sort-btn");

	selectAllDOM.addEventListener("change", function () {
		songItems.forEach(function (songItem) {
			songItem.checked = selectAllDOM.checked;
			if (selectAllDOM.checked) {
				lists[songItem.getAttribute("data-id")] = true;
			} else {
				delete lists[songItem.getAttribute("data-id")];
			}
		});

		const checkedItemsLength =
			$$(".song__checkbox-input:checked")?.length ?? 0;
		if (checkedItemsLength > 0) {
			deleteSelected.disabled = false;
		} else {
			deleteSelected.disabled = true;
		}
	});

	// Track if we check all of the sub checkbox
	songItems.forEach((songItem) => {
		songItem.addEventListener("change", function () {
			const id = this.getAttribute("data-id");
			if (this.checked) {
				lists[id] = true;
			} else {
				delete lists[id];
			}

			const checkedItemsLength =
				$$(".song__checkbox-input:checked")?.length ?? 0;
			if (checkedItemsLength == songItems.length) {
				selectAllDOM.checked = true;
			} else {
				selectAllDOM.checked = false;
			}

			if (checkedItemsLength > 0) {
				deleteSelected.disabled = false;
			} else {
				deleteSelected.disabled = true;
			}
		});
	});

	deleteSelected.addEventListener("click", openDeleteModal);
	$(".delete-btn--cancel").addEventListener("click", closeDeleteModal);
	$(".delete-btn--confirm").addEventListener("click", (e) => {
		e.preventDefault();

		const str = [];

		for (const item in lists) {
			str.push(item);
		}
		const hiddenInput = $("input.hidden-list");
		hiddenInput.setAttribute("type", "hidden");
		hiddenInput.setAttribute("name", "list");
		hiddenInput.setAttribute("value", str.join(" "));
		form.appendChild(hiddenInput);
		form.submit();
	});

	orderSongButtons.forEach((orderSongButton) => {
		orderSongButton.addEventListener("click", (e) => {
			e.preventDefault();

			$("#sort-option").value = orderSongButton.getAttribute("data-sort");

			$("#sort-form").submit();
		});
	});
});
