"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalProduct = void 0;
const typeorm_1 = require("typeorm");
const Product_js_1 = require("./Product.js");
let PromotionalProduct = class PromotionalProduct extends typeorm_1.BaseEntity {
};
exports.PromotionalProduct = PromotionalProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PromotionalProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], PromotionalProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], PromotionalProduct.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PromotionalProduct.prototype, "promotions_price", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], PromotionalProduct.prototype, "promotion_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], PromotionalProduct.prototype, "promotion_ending_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], PromotionalProduct.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'promotion_type' }),
    __metadata("design:type", String)
], PromotionalProduct.prototype, "promotion_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'product_category' }),
    __metadata("design:type", String)
], PromotionalProduct.prototype, "product_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'manufacturer' }),
    __metadata("design:type", String)
], PromotionalProduct.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PromotionalProduct.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PromotionalProduct.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_js_1.Product, product => product.promotions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", Product_js_1.Product)
], PromotionalProduct.prototype, "product", void 0);
exports.PromotionalProduct = PromotionalProduct = __decorate([
    (0, typeorm_1.Entity)()
], PromotionalProduct);
//# sourceMappingURL=PromotionalProduct.js.map