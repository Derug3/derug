export const selectStyles = {
  control(base: any, props: any) {
    return {
      background: "#161b22",
      border: "1px solid rgb(9, 194, 246)",
      display: "flex",
      padding: "0.5em",
      borderRadius: "4px",
    };
  },
  dropdownIndicator(base: any, props: any) {
    return {
      display: "none",
    };
  },
  input(base: any, props: any) {
    return { ...base, color: "white" };
  },
  indicatorSeparator(base: any, props: any) {
    return {
      display: "none",
    };
  },
  menu(base: any, props: any) {
    return { ...base, border: "1px solid cyan", borderRadius: "4px" };
  },
  menuList(base: any, props: any) {
    return {
      ...base,
      background: "#161b22",
      color: "white",
      fontWeight: "bold",
    };
  },
  option(base: any, props: any) {
    return {
      ...base,
      ":hover": {
        background: "#161b22",
        cursor: "pointer",
      },
    };
  },
};
