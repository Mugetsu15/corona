name: run-script
on: push

jobs:
run:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v1
- name: script
run: PATH/script.sh
shell: bash
with:
password: ${{ secrets.ACCESS_TOKEN }}
