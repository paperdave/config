all: bin/setsid

bin/setsid: scripts/setsid.c
	clang -o bin/setsid scripts/setsid.c
