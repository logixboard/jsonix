Jsonix.XML.QName = Jsonix.Class({
	key : null,
	namespaceURI : null,
	localPart : null,
	prefix : null,
	string : null,
	initialize : function(one, two, three) {
		var namespaceURI;
		var localPart;
		var prefix;
		var key;
		var string;

		if (!Jsonix.Util.Type.exists(two)) {
			namespaceURI = '';
			localPart = one;
			prefix = '';
		} else if (!Jsonix.Util.Type.exists(three)) {
			namespaceURI = Jsonix.Util.Type.exists(one) ? one : '';
			localPart = two;
			var colonPosition = two.indexOf(':');
			if (colonPosition > 0 && colonPosition < two.length) {
				prefix = two.substring(0, colonPosition);
				localPart = two.substring(colonPosition + 1);
			} else {
				prefix = '';
				localPart = two;
			}
		} else {
			namespaceURI = Jsonix.Util.Type.exists(one) ? one : '';
			localPart = two;
			prefix = Jsonix.Util.Type.exists(three) ? three : '';
		}
		this.namespaceURI = namespaceURI;
		this.localPart = localPart;
		this.prefix = prefix;

		this.key = (namespaceURI !== '' ? ('{' + namespaceURI + '}') : '') + localPart;
		this.string = (namespaceURI !== '' ? ('{' + namespaceURI + '}') : '') + (prefix !== '' ? (prefix + ':') : '') + localPart;
	},
	toString : function() {
		return this.string;
	},
	clone : function() {
		return new Jsonix.XML.QName(this.namespaceURI, this.localPart, this.prefix);
	},
	equals : function(that) {
		if (!that) {
			return false;
		} else {
			return (this.namespaceURI == that.namespaceURI) && (this.localPart == that.localPart);
		}

	},
	CLASS_NAME : "Jsonix.XML.QName"
});
Jsonix.XML.QName.fromString = function(qNameAsString) {
	var leftBracket = qNameAsString.indexOf('{');
	var rightBracket = qNameAsString.lastIndexOf('}');
	var namespaceURI;
	var prefixedName;
	if ((leftBracket === 0) && (rightBracket > 0) && (rightBracket < qNameAsString.length)) {
		namespaceURI = qNameAsString.substring(1, rightBracket);
		prefixedName = qNameAsString.substring(rightBracket + 1);
	} else {
		namespaceURI = '';
		prefixedName = qNameAsString;
	}
	var colonPosition = prefixedName.indexOf(':');
	var prefix;
	var localPart;
	if (colonPosition > 0 && colonPosition < prefixedName.length) {
		prefix = prefixedName.substring(0, colonPosition);
		localPart = prefixedName.substring(colonPosition + 1);
	} else {
		prefix = '';
		localPart = prefixedName;
	}
	return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};
Jsonix.XML.QName.fromObject = function(object) {
	Jsonix.Util.Ensure.ensureObject(object);
	if (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === 'Jsonix.XML.QName') {
		return object;
	}
	Jsonix.Util.Ensure.ensureString(object.localPart);
	var namespaceURI = Jsonix.Util.Type.isString(object.namespaceURI) ? object.namespaceURI : '';
	var localPart = object.localPart;
	var prefix = Jsonix.Util.Type.isString(object.prefix) ? object.prefix : '';
	return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};
Jsonix.XML.QName.key = function(namespaceURI, localPart) {
	Jsonix.Util.Ensure.ensureString(localPart);
	if (namespaceURI) {
		var colonPosition = localPart.indexOf(':');
		if (colonPosition > 0 && colonPosition < localPart.length) {
			localName = localPart.substring(colonPosition + 1);
		} else {
			localName = localPart;
		}
		return '{' + namespaceURI + '}' + localName;
	} else {
		return localPart;
	}
};