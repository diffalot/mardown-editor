# Directories
TARGET_DIR = dist

# Binaries
WEBPACK = ./node_modules/.bin/webpack
NODEMON = ./node_modules/.bin/nodemon
BROWSER_SYNC = ./node_modules/.bin/browser-sync
STANDARD = ./node_modules/.bin/standard
NPM = npm

.PHONY: dist clean watch node_modules

build: $(TARGET_DIR)

clean:
	rm -rf $(TARGET_DIR)

static: index templates

index:
	mkdir -p $(TARGET_DIR)
	cp ./src/index.html $(TARGET_DIR)

templates:
	mkdir -p $(TARGET_DIR)/app/editor
	cp ./src/app/editor/*.html $(TARGET_DIR)/app/editor/

lint: node_modules
	$(STANDARD)

watch: node_modules clean static
	$(NODEMON) --watch src/index.html --exec "make index" &
	$(WEBPACK) --debug --devtool source-map --output-pathinfo --progress --watch &
	$(BROWSER_SYNC) start --files "$(TARGET_DIR)/**/*" --server $(TARGET_DIR)

$(TARGET_DIR): lint clean static
	$(WEBPACK) --optimize-minimize

node_modules:
	$(NPM) install
