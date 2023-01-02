const Show = (props: { if: boolean; children: any }) =>
  props.if ? props.children : null;

export default Show;
