CCRED=\033[0;31m
CCEND=\033[0m

.PHONY: build clean help

help: ## Show this help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build design tokens
	@node_modules/style-dictionary/bin/style-dictionary build --config ./config.js

clr: ## Build MacOS color palette
	colorTool/Html2Clr ./input/clr/dCom.txt
	colorTool/Html2Clr ./input/clr/dcom\ ++.txt
	@mv input/clr/dCom.clr ../assets/colorPalettes
	@mv "input/clr/dCom ++.clr" ../assets/colorPalettes

clean: ## Delete outputs files
	rm -rf output
