export default function getClassNameFromIndexes(paramName, indexArray) {
	let paramCondition = null;
	let gradientClassName = 'condition';
	paramCondition = indexArray.filter((el) => el.param === paramName);

	if (paramCondition.length === 0) {
		gradientClassName += 'NoData';
		return gradientClassName;
	} else paramCondition = paramCondition[0].indexLevel.indexLevelName;

	switch (paramCondition) {
		case 'Bardzo dobry':
			gradientClassName += 'VeryGood';
			break;
		case 'Dobry':
			gradientClassName += 'Good';
			break;
		case 'Umiarkowany':
			gradientClassName += 'Moderate';
			break;
		case 'Dostateczny':
			gradientClassName += 'Sufficient';
			break;
		case 'Zły':
			gradientClassName += 'Bad';
			break;
		case 'Bardzo zły':
			gradientClassName += 'VeryBad';
			break;
		default:
			gradientClassName += 'NoData';
	}

	return gradientClassName;
}
