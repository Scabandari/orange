const loadState = (state) => {
	try {
		const serializedState = localStorage.getItem(state);
		if (serializedState === null) {
			return null;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.log(err);
		return null;
	}
};

const saveState = (name, newState) => {
	try {
		const serializedState = JSON.stringify(newState);
		localStorage.setItem(name, serializedState);
	} catch (err) {
		console.log(err);
	}
};

const isPalindrom = (word) => {
	let front = 0;
	let back = word.length-1;
	while (back > front) {
		if (word[front] !== word[back]) {
			return false;
		}
		front++;
		back--;
	}
	return true;
};

export { loadState, saveState };
