<script lang="jsx">
import '../assets/styles/form.css'
import {
  ref,
  defineComponent,
  resolveComponent,
  defineProps,
  reactive,
  nextTick,
  onBeforeMount,
  h,
} from "vue";
export default defineComponent({
  props: ["param"],
  setup(props) {
    console.log(props);
    const param = props.param;
    const form = reactive({});
    param.map((item) => {
      form[item.field] = ref(item.default);
    });
    function onSubmit() {
      console.log(form);
    }
    function onCancel() {
      param.map((item) => {
        form[item.field] = ref(item.default);
      });
    }
    return () => (
      <el-form model={form} label-width="auto" inline>
        {param.map((item, index) => (
          <el-form-item
            label={item.name}
            rules={item.verify.rules}
            prop={item.field}
            v-show={!item.hidden}
            style={{ width: item.layout }}
          >
            {"div span p h".includes(item.template.el)
              ? h(item.template.el, form[item.field])
              : h(
                  resolveComponent(item.template.el),
                  {
                    "model-value": form[item.field],
                    ["onUpdate:model-value"]: (val) => {
                      form[item.field] = val;
                    },
                    ...item.func,
                    ...item.template.attribute,
                  },
                  item.child
                    ? (function () {
                        let el = {};
                        for (const key in item.child) {
                          const item1 = item.child[key];
                          console.log(key);
                          el[key] = () => {
                            return [
                              item1.map((item2) => {
                                return h(resolveComponent(item2.template.el), {
                                  ...item2.template.attribute,
                                });
                              }),
                            ];
                          };
                        }
                        return el
                      })()
                    : {
                        undefault: () => [],
                      }
                )}
          </el-form-item>
        ))}
        <el-form-item>
          <el-button type="primary" onClick={onSubmit}>
            Submit
          </el-button>
          <el-button onClick={onCancel}>Cancel</el-button>
        </el-form-item>
      </el-form>
    );
  },
});
</script>
