const dolmeengiiRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that a variable named `dolmeengii` can only be assigned a value of 'dolmeegii'.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.parent.kind === "const") {
          if (node.id.type === "Identifier" && node.id.name === "dolmeengii") {
            if (
              node.init &&
              node.init.type === "Literal" &&
              node.init.value !== "dolmeengii"
            ) {
              context.report({
                node,
                message:
                  'const 로 정의한 변수 이름이 dolmeengii 라면 문자열 "dolmeengii" 이외에는 값을 사용할 수 없다.',
                data: {
                  notDolmeengii: node.init.value,
                },
                fix(fixer) {
                  return fixer.replaceText(node.init, '"dolmeengii"');
                },
              });
            }
          }
        }
      },
    };
  },
};

export default dolmeengiiRule;
