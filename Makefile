# This file is based on the corresponding jQuery file.
SRC_DIR = src
TEST_DIR = test
BUILD_DIR = build
VENDOR_DIR = vendor
TEST_DIR = testing

# PREFIX = .
# DIST_DIR = ${PREFIX}/dist

JS_ENGINE ?= `which node nodejs 2>/dev/null`
COMPILER = ${JS_ENGINE} ${VENDOR_DIR}/uglify.js --unsafe
POST_COMPILER = ${JS_ENGINE} ${VENDOR_DIR}/post-compile.js

BASE_FILES = ${SRC_DIR}/modules/functions.js\
	${SRC_DIR}/modules/screen.js\
	${SRC_DIR}/modules/canvas.js\
	${SRC_DIR}/modules/svg.js\
	${SRC_DIR}/modules/vector.js\
	${SRC_DIR}/modules/circle.js\
	${SRC_DIR}/modules/complex.js\
	${SRC_DIR}/modules/line.js\
	${SRC_DIR}/modules/mathML.js\
	${SRC_DIR}/modules/matrix.js\
	${SRC_DIR}/modules/permutation.js\
	${SRC_DIR}/modules/point.js\
	${SRC_DIR}/modules/polynomial.js\
	${SRC_DIR}/modules/set.js\

TEST_FILES = ${TEST_DIR}/functions.js\
	${TEST_DIR}/vector.js\
	${TEST_DIR}/circle.js\
	${TEST_DIR}/complex.js\
	${TEST_DIR}/line.js\
	${TEST_DIR}/mathML.js\
	${TEST_DIR}/matrix.js\
	${TEST_DIR}/permutation.js\
	${TEST_DIR}/point.js\
	${TEST_DIR}/polynomial.js\
	${TEST_DIR}/set.js\

MODULES = ${SRC_DIR}/license.js\
	${SRC_DIR}/head.js\
	${BASE_FILES}\
	${SRC_DIR}/foot.js

TEST_MODULES = ${TEST_FILES}

ML = ${BUILD_DIR}/MathLib.js
ML_MIN = ${BUILD_DIR}/MathLib.min.js
TESTING = ${BUILD_DIR}/MathLib.testing.js


ML_VER = $(shell cat version.txt)
VER = sed "s/@VERSION/${ML_VER}/"

DATE=$(shell git log -1 --pretty=format:%ad)



core: MathLib min testing hint
	@@echo "MathLib build complete."


# MathLib
MathLib: ${ML}
${ML}: ${MODULES} | ${BUILD_DIR}
	@@echo "Building" ${ML}

	@@cat ${MODULES} | \
		sed 's/.function..MathLib...{//' | \
		sed 's/}...MathLib..;//' | \
		sed 's/@DATE/'"${DATE}"'/' | \
		${VER} > ${ML};



# Tests
testing: MathLib ${TESTING}
${TESTING}: ${TEST_MODULES} | ${BUILD_DIR}
	@@echo "Building" ${TESTING}

	@@cat ${TEST_MODULES} | \
		sed 's/.function..MathLib...{//' | \
		sed 's/}...MathLib..;//' | \
		sed 's/@DATE/'"${DATE}"'/' | \
		${VER} > ${TESTING};


# JSHint testing
hint: MathLib
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Checking MathLib against JSHint..."; \
		${JS_ENGINE} vendor/jsHint-check.js; \
	else \
		echo "You must have NodeJS installed in order to test MathLib against JSHint."; \
	fi


# Minifying
min: MathLib ${ML_MIN}
${ML_MIN}: ${ML}
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Minifying MathLib" ${ML_MIN}; \
		${COMPILER} ${ML} > ${ML_MIN}.tmp; \
		${POST_COMPILER} ${ML_MIN}.tmp; \
		rm -f ${ML_MIN}.tmp; \
	else \
		echo "You must have NodeJS installed in order to minify MathLib."; \
	fi

