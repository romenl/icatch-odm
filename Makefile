MODULE_NAME		:= camweb
HOME_PATH		:= $(shell pwd)
DES_PATH		:= ../marble/source/$(MODULE_NAME)


all: clean install

install:
	@echo '╔===============╗'
	@echo '║ Installing... ║'
	@echo '╚===============╝'
	mkdir -p $(DES_PATH)
	cp -a config/ $(DES_PATH)
	cp -a public/ $(DES_PATH)
	cp -a scripts/ $(DES_PATH)
	cp -a src/ $(DES_PATH)
	cp -a package.json $(DES_PATH)
	cp -a yarn.lock $(DES_PATH)

clean:
	@echo '╔===========================╗'
	@echo '║ Clean camweb in marble... ║'
	@echo '╚===========================╝'
	rm -rf $(DES_PATH)/config/
	rm -rf $(DES_PATH)/public/
	rm -rf $(DES_PATH)/scripts/
	rm -rf $(DES_PATH)/src/
	rm -rf $(DES_PATH)/package.json
	rm -rf $(DES_PATH)/yarn.lock
