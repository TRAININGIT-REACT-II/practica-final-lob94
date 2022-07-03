import Login from "../src/login/components/Login";

describe(Login, () => {
  describe("Render", () => {
    let wrapper;

        // Inicializamos el componente en un beforeEach para
        // evitar tener que repetir esta línea en cada test
    beforeEach(() => {
        wrapper = render(<Login />);
    });

    it("agrega los elementos HTML", () => {
        // Comprobamos los distintos aspectos de HTML
        expect(wrapper).toMatchSnapshot();
    });

    it("muestra", () => {
        // Comprobamos el texto
        expect(wrapper.find(".user").text()).toBe("");
        expect(wrapper.find(".password").text()).toBe("");
    });
  });

  describe("Funcionalidades", () => {
    let wrapper;

    // Inicializamos el componente en un beforeEach para
    // evitar tener que repetir esta línea en cada test
    beforeEach(() => {
        wrapper = mount(<Login />);
    });

    it("Actualiza el valor cuando se hace Submit", () => {
        // Al igual que los anteriores, también necesitamos utilizar mount, ya que
        // vamos a modificar el valor del input

        // Actualizamos el nombre
        const newName = "name";
        const inputName = wrapper.find("#name");
        // Para controlados, necesitamos lanzar el evento
        inputName.simulate("change", { target: { value: newName } });

        // Acutalizamos el color
        const newPassword = "test";
        const inputPassword = wrapper.find("#password");
        inputPassword.simulate("change", { target: { value: newPassword } });

        // Simulamos el envío del formulario
        //wrapper.find("form").simulate("submit");

        // Comprobamos que se muestran los valores
        expect(wrapper.state('userName')).toEqual(newName);
        expect(wrapper.state('password')).toEqual(newPassword);
    });
  });
});