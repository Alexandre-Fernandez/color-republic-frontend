export class TagMap extends Map { 
	constructor(array = []) { 
		super()
		this._tagMaps = new Map()
		if(array.constructor === Array && array.length > 0) {
			for(let i = 0; i < array.length; i++) {
				this.set(array[i][0], array[i][1][0], array[i][1][1])
			}
		}
	}

	set(key, value, tags) {
		if(super.has(key)) this.delete(key)
		if(typeof value !== 'object') value = [value]
		if(tags.constructor !== Array) tags = [tags]
		for(const i in tags) {
			let tag = this._tagMaps.get(tags[i])
			if(!tag) {
				this._tagMaps.set(tags[i], new Map().set(key, value))
				continue
			}
			tag.set(key, value)
		}
		return super.set(key, [value, tags])
	}

	hasTag(key) {
		return this._tagMaps.has(key)
	}

	getItemValue(key) {
		return super.get(key)?.[0]
	}
	
	getItemTags(key) {
		return super.get(key)?.[1]
	}

	getItemsByTag(tag) {
		return this._tagMaps.get(tag)
	}

	getTags() {
		return [...this._tagMaps.keys()]
	}
	
	delete(key) {
		const item = super.get(key)
		if(!item) return false
		for(const tag of item[1]) {
			const tagMap = this._tagMaps.get(tag)
			if(tagMap.size === 1) {this._tagMaps.delete(tag); continue}
			tagMap.delete(key)
		}
		return super.delete(key)
	}

	deleteTag(tag) {
		const tagMap = this._tagMaps.get(tag)
		if(!tag) return false
		tagMap.forEach((_, key) => {
			const item = super.get(key)
			const tagIndex = item[1].indexOf(tag)
			if(tagIndex === -1) return
			if(item[1].length === 1) return super.delete(key)
			item[1].splice(tagIndex, 1)
		})
		return this._tagMaps.delete(tag)
	}

	clear() {
		super.clear()
		this._tagMaps.clear()
	}
} // changing key/tag without using delete/set will break the TagMap (can be fixed by using Proxy setter)


export function clone(obj) {
    let objClone = {}
    if(obj.constructor === Array) objClone = new Array(obj.length)

    for(const key in obj) {
        if(obj[key] == null) { objClone[key] = null; continue }
        if(obj[key].constructor === Array 
        || typeof obj[key] === 'object') { objClone[key] = clone(obj[key]); continue }
        objClone[key] = obj[key]
    }
    return objClone
}


export function toSqlDate(date, isUtc = true) {
	const atleastTwoDigits = num => {
		if(0 <= num && num <= 9) return `0${num.toString()}`
		if(-9 <= num && num < 0) return `-0${(num * -1).toString()}`
		return num.toString()
	}
	if(isUtc) return `${date.getUTCFullYear()}-${atleastTwoDigits(1 + date.getUTCMonth())}-${atleastTwoDigits(date.getUTCDate())} ${atleastTwoDigits(date.getUTCHours())}:${atleastTwoDigits(date.getUTCMinutes())}:${atleastTwoDigits(date.getUTCSeconds())}`
	return `${date.getFullYear()}-${atleastTwoDigits(1 + date.getMonth())}-${atleastTwoDigits(date.getDate())} ${atleastTwoDigits(date.getHours())}:${atleastTwoDigits(date.getMinutes())}:${atleastTwoDigits(date.getSeconds())}`
}


// compareFunction returns the new check direction :
// x => {if(x < 5) return 1; if(x === 5) return 0; if(x > 5) return -1} // finds 5
export function binarySearch(sortedArray, compareFunction, isFirstOccurence = true, from = null, to = null) {
	if(sortedArray.length === 0) return -1
	let left = from != null ? Math.floor(from) : 0
	let right = to != null ? Math.floor(to) : sortedArray.length - 1
	while(left !== right) {
		const mid = isFirstOccurence 
		? Math.floor(left + (right - left) / 2) 
		: Math.ceil(left + (right - left) / 2)
		const direction = compareFunction(sortedArray[mid])
		if(isFirstOccurence) {
			if(direction > 0) left = mid + 1
			else right = mid
			continue
		}
		if(direction < 0) right = mid - 1
		else left = mid
	}
	if(compareFunction(sortedArray[right])) return -1
	return right
}


export function binarySearchRange(sortedArray, minCompareFunction, maxCompareFunction) {
	if(sortedArray.length - 1 === 0) return -1
	const range = [
		binarySearch(sortedArray, minCompareFunction, true),
		binarySearch(sortedArray, maxCompareFunction, false)
	]
	return range
}


export function isInRange(value, range) {
	return range[0] <= value && value <= range[1]
}




/*
red = sqrt(40000/2)
141.421356237
green = sqrt(40000/4)
100
blue = sqrt(40000/3)
115.470053838

WHERE ABS(255 - r) <= 141.42 AND ABS(0 - g) <= 100 AND ABS(0 - b) <= 115.47
*/


// product 145, 67, 89

// filter 255, 0, 0

// Math.abs(filter.r - product.r) <= 141.42

export function areRedsAlike(r1, r2, threshold = 141.42) { 
	return Math.abs(r1 - r2) <= threshold // threshold = sqrt(40000/2)
}
export function areGreensAlike(g1, g2, threshold = 100) { 
	return Math.abs(g1 - g2) <= threshold // threshold = sqrt(40000/4)
}
export function areBluesAlike(b1, b2, threshold = 115.47) { 
	return Math.abs(b1 - b2) <= threshold // threshold = sqrt(40000/3)
}







