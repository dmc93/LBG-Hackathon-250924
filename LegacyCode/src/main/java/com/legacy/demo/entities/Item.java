package com.legacy.demo.entities;

import jakarta.persistence.*;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String product;
    private Double price;
    private Integer quantity;
    private String expiry_date;  // Consistent naming: expiry_date
    private String category;

    public Item() {
    }

    // Updated constructor with consistent naming
    public Item(Integer id, String product, Double price, Integer quantity, String expiry_date, String category) {
        this.id = id;
        this.product = product;
        this.price = price;
        this.quantity = quantity;
        this.expiry_date = expiry_date;
        this.category = category;
    }

    // Another constructor with consistent naming
    public Item(String product, Double price, String expiry_date, String category) {
        this.product = product;
        this.price = price;
        this.expiry_date = expiry_date;
        this.category = category;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProduct() {  // Updated to getProduct for clarity
        return product;
    }

    public void setProduct(String product) {  // Updated to setProduct for clarity
        this.product = product;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getExpiryDate() {
        return expiry_date;
    }

    public void setExpiryDate(String expiry_date) {
        this.expiry_date = expiry_date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
