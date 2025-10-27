import React, { useState } from "react";
import "./ProductCatalog.css";

const ProductCatalog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({
        alimentoSeco: false,
        alimentoHumedo: false,
        snacks: false,
        precio: "todos",
    });

    const products = [
        {
            id: 1,
            name: "Snacks de Atún",
            description: "Pequeños premios para tu felino.",
            price: 120,
            image: "",
        },
        {
            id: 2,
            name: "Snacks Crunchy de Queso",
            description: "Deliciosos bocados crujientes y nutritivos.",
            price: 160,
            image: "",
        },
        {
            id: 3,
            name: "Paté de Pavo Light",
            description: "Ideal para gatos con control de peso.",
            price: 180,
            image: "",
        },
        {
            id: 4,
            name: "Paté Gourmet de Pollo",
            description: "Textura suave y sabor irresistible.",
            price: 220,
            image: "",
        },
        {
            id: 5,
            name: "Croquetas de Salmón",
            description: "Ricas en omega 3 y proteínas naturales.",
            price: 350,
            image: "",
        },
        {
            id: 6,
            name: "Croquetas Premium de Pollo",
            description: "Alta calidad para gatos adultos exigentes.",
            price: 420,
            image: "",
        },
    ];

    // Filtrado combinado: búsqueda + filtros
    const filteredProducts = products.filter((product) => {
        // 1. Búsqueda por nombre o descripción
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        // 2. Filtro por tipo
        const isAlimentoSeco = product.name.toLowerCase().includes("croquetas");
        const isAlimentoHumedo = product.name.toLowerCase().includes("paté");
        const isSnack = product.name.toLowerCase().includes("snacks");

        const tipoSeleccionado =
            selectedFilters.alimentoSeco ||
            selectedFilters.alimentoHumedo ||
            selectedFilters.snacks;
        if (tipoSeleccionado) {
            if (
                !(selectedFilters.alimentoSeco && isAlimentoSeco) &&
                !(selectedFilters.alimentoHumedo && isAlimentoHumedo) &&
                !(selectedFilters.snacks && isSnack)
            ) {
                return false;
            }
        }

        // 3. Filtro por precio
        if (selectedFilters.precio === "hasta200" && product.price > 200)
            return false;
        if (
            selectedFilters.precio === "200a400" &&
            (product.price < 200 || product.price > 400)
        )
            return false;
        if (selectedFilters.precio === "mas400" && product.price <= 400)
            return false;

        return true;
    });

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prev) => ({ ...prev, [filterType]: value }));
    };

    const handlePriceFilterChange = (value) => {
        setSelectedFilters((prev) => ({ ...prev, precio: value }));
    };

    return (
        <div className="product-catalog">
            <header className="catalog-header">
                <div className="logo-container">
                    <img
                        src="https://i.ibb.co/svPsJMNM/logo.png"
                        alt="Logo OttoGourmet"
                        className="logo-image"
                    />
                    <span className="logo-text">OttoGourmet</span>
                </div>
                <div className="search-sort">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="sort-buttons">
                        <button className="sort-btn">▲ Precio</button>
                        <button className="sort-btn">▼ Precio</button>
                    </div>
                </div>
            </header>
            <div className="catalog-container">
                <aside className="filters-panel">
                    <h3>Filtros</h3>
                    <div className="filter-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedFilters.alimentoSeco}
                                onChange={(e) =>
                                    handleFilterChange(
                                        "alimentoSeco",
                                        e.target.checked
                                    )
                                }
                            />
                            Alimento seco
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedFilters.alimentoHumedo}
                                onChange={(e) =>
                                    handleFilterChange(
                                        "alimentoHumedo",
                                        e.target.checked
                                    )
                                }
                            />
                            Alimento húmedo
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedFilters.snacks}
                                onChange={(e) =>
                                    handleFilterChange(
                                        "snacks",
                                        e.target.checked
                                    )
                                }
                            />
                            Snacks
                        </label>
                    </div>

                    <h3>Rango de precios</h3>
                    <div className="price-filter-group">
                        <label>
                            <input
                                type="radio"
                                name="precio"
                                value="todos"
                                checked={selectedFilters.precio === "todos"}
                                onChange={() =>
                                    handlePriceFilterChange("todos")
                                }
                            />
                            Todos
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="precio"
                                value="hasta200"
                                checked={selectedFilters.precio === "hasta200"}
                                onChange={() =>
                                    handlePriceFilterChange("hasta200")
                                }
                            />
                            Hasta $200
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="precio"
                                value="200a400"
                                checked={selectedFilters.precio === "200a400"}
                                onChange={() =>
                                    handlePriceFilterChange("200a400")
                                }
                            />
                            $200 - $400
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="precio"
                                value="mas400"
                                checked={selectedFilters.precio === "mas400"}
                                onChange={() =>
                                    handlePriceFilterChange("mas400")
                                }
                            />
                            Más de $400
                        </label>
                    </div>
                </aside>

                <main className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <h4>{product.name}</h4>
                                <p className="product-description">
                                    {product.description}
                                </p>
                                <p className="product-price">
                                    ${product.price}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">
                            No se encontraron productos.
                        </p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductCatalog;
