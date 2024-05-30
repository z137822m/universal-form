<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '97vh' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script>
import { defineComponent, ref, shallowRef, reactive } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {    
    const code = `
    function changeSwith(val) {
      form[3].hidden = !val;
      form[4].hidden = !val;
    };

    form=[
      {
        name: "姓名",
        field: "name",
        template: { el: "div" },
        default: ref("1"),
        layout: "50%",
        verify: {},
      },
      {
        name: "手机1213231",
        field: "phone",
        template: { el: "el-input" },
        default: ref(1),
        layout: "50%",
        verify: reactive({
          rules: [
            {
              required: true,
              message: "Please input phone",
              trigger: "blur",
            },
          ],
        }),
      },
      {
        name: "开关1313213132",
        field: "switch",
        template: { el: "el-switch" },
        default: ref(true),
        layout: "100%",
        verify: {
          rules: [
            {
              required: true,
              message: "Please",
              trigger: "blur",
            },
          ],
        },
        func: { onChange: changeSwith },
      },
      {
        name: "时间",
        field: "time1",
        template: {
          el: "el-date-picker",
          attribute: {
            type: "year",
            format: "YYYY",
            "value-format": "YYYY",
            placeholder: "Pick a week",
          },
        },
        default: ref(""),
        layout: "100%",
        verify: reactive({
          rules: [
            {
              required: true,
              message: "Please pick",
              trigger: "blur",
            },
          ],
        }),
      },
      {
        name: "多选框组",
        field: "checkbox",
        template: { el: "el-checkbox-group", attribute: { max: 1 } },
        default: ref([]),
        layout: "100%",
        verify: reactive({
          rules: [
            {
              type: "array",
              required: true,
              message: "Please checkbox",
              trigger: "change",
            },
          ],
        }),
        child: {
          default: [
            {
              template: {
                el: "el-checkbox",
                attribute: {
                  label: "1",
                  value: "1",
                },
              },
            },
            {
              template: {
                el: "el-checkbox",
                attribute: {
                  label: "2",
                  value: "2",
                },
              },
            },
            {
              template: {
                el: "el-checkbox",
                attribute: {
                  label: "3",
                  value: "3",
                },
              },
            },
          ],
        },
      },
      {
        name: "级联选择器",
        field: "cascader",
        template: {
          el: "el-cascader",
          attribute: {
            props: {
              value: "value",
              label: "label",
              children: "children",
            },
            options: [
              {
                value: "guide",
                label: "Guide",
                children: [
                  {
                    value: "disciplines",
                    label: "Disciplines",
                    children: [
                      {
                        value: "consistency",
                        label: "Consistency",
                      },
                      {
                        value: "feedback",
                        label: "Feedback",
                      },
                      {
                        value: "efficiency",
                        label: "Efficiency",
                      },
                      {
                        value: "controllability",
                        label: "Controllability",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
        default: ref([]),
        layout: "100%",
        verify: reactive({
          rules: [
            {
              type: "array",
              required: true,
              message: "Please cascader",
              trigger: "blur",
            },
          ],
        }),
        func: {
          onChange: (val) => {
            console.log(val);
          },
        },
      },
      {
        name: "取色器",
        field: "color",
        template: { el: "el-color-picker" },
        default: ref(),
        layout: "50%",
        verify: reactive({
          rules: [
            {
              required: false,
              message: "Please input phone",
              trigger: "blur",
            },
          ],
        }),
      },
      {
        name: "单选框组",
        field: "radio",
        template: { el: "el-radio-group" },
        default: ref(),
        layout: "50%",
        verify: reactive({
          rules: [
            {
              required: true,
              message: "Please checkbox",
              trigger: "change",
            },
          ],
        }),
        child: {
          default: [
            {
              template: {
                el: "el-radio",
                attribute: {
                  label: "1",
                  value: "1",
                },
              },
            },
            {
              template: {
                el: "el-radio",
                attribute: {
                  label: "2",
                  value: "2",
                },
              },
            },
          ],
        },
      },
      {
        name: "选择器",
        field: "select",
        template: { el: "el-select", attribute: { placeholder: "Select" } },
        default: ref(),
        layout: "50%",
        verify: reactive({
          rules: [
            {
              required: true,
              message: "Please select",
              trigger: "blur",
            },
          ],
        }),
        child: {
          default: [
            {
              template: {
                el: "el-option",
                attribute: {
                  label: "1",
                  value: "1",
                },
              },
            },
            {
              template: {
                el: "el-option",
                attribute: {
                  label: "2",
                  value: "2",
                },
              },
            },
          ],
        },
      },
      {
        name: "上传",
        field: "upload",
        template: {
          el: "el-upload",
          attribute: {
            "file-list": [
              {
                name: "element-plus-logo.svg",
                url: "https://element-plus.org/images/element-plus-logo.svg",
              },
              {
                name: "element-plus-logo2.svg",
                url: "https://element-plus.org/images/element-plus-logo.svg",
              },
            ],
            action:
              "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
            "on-preview": (file, uploadFiles) => {
              console.log(file, uploadFiles);
            },
            "on-remove": (uploadFile) => {
              console.log(uploadFile);
            },
            "before-remove": (uploadFile, uploadFiles) => {
              return ElMessageBox.confirm(
                'Cancel the this ?'
              ).then(
                () => true,
                () => false
              );
            },
            limit: 3,
            "on-exceed": (files, uploadFiles) => {
              ElMessage.warning(
                'The limit is 3'
              );
            },
          },
        },
        default: ref([]),
        layout: "100%",
        verify: reactive({
          rules: [
            {
              type: "array",
              required: true,
              message: "Please upload",
              trigger: "change",
            },
          ],
        }),
        child: {
          default: [
            {
              template: {
                el: "el-button",
                attribute: {
                  type: "primary",
                  innerHTML: "上传",
                },
              },
            },
          ],
          tip: [
            {
              template: {
                el: "el-text",
                attribute: {
                  class: "el-upload__tip",
                  innerHTML: "jpg/png files with a size less than 500KB.",
                },
              },
            },
          ],
        },
      },
      {
        name: "徽章",
        field: "badge",
        template: { el: "el-badge", attribute: { value: 199 } },
        default: ref(),
        layout: "50%",
        verify: reactive({}),
        child: {
          default: [
            {
              template: {
                el: "el-button",
                attribute: {
                  innerHTML: "comments",
                },
              },
            },
          ],
        },
      },
    ]`;

    const extensions = [javascript(), oneDark];

    // Codemirror EditorView instance ref
    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
    };

    // Status is available at all times via Codemirror EditorView
    const getCodemirrorStates = () => {
      const state = view.value.state;
      const ranges = state.selection.ranges;
      const selected = ranges.reduce(
        (r, range) => r + range.to - range.from,
        0
      );
      const cursor = ranges[0].anchor;
      const length = state.doc.length;
      const lines = state.doc.lines;
      // more state info ...
      // return ...
    };

    return {
      code,
      extensions,
      handleReady,
      log: console.log,
    };
  },
});
</script>
<style scoped></style>
