import React from 'react';
import { X, ShoppingBag, ChevronRight, Trash2 } from 'lucide-react';
import { DrawerType, ShopItem, CartItem } from '../types';
import { SHOP_ITEMS, COLLECTION_ITEMS, JOURNAL_ITEMS } from '../data';

interface SideDrawerProps {
  activeDrawer: DrawerType;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (item: ShopItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onCheckout: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  activeDrawer,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
}) => {
  if (!activeDrawer) return null;

  const totalCartPrice = cart.reduce(
    (sum, c) => sum + c.item.price * c.quantity,
    0
  );

  const getDrawerHeaderTitle = () => {
    switch (activeDrawer) {
      case 'SHOP':
        return 'Catalog';
      case 'COLLECTIONS':
        return 'Archive 2026';
      case 'JOURNAL':
        return 'Editorial';
      case 'CART':
        return 'Shopping Bag';
      default:
        return '';
    }
  };

  const getDrawerSubtitle = () => {
    switch (activeDrawer) {
      case 'SHOP':
        return 'Featured Garments';
      case 'COLLECTIONS':
        return 'Season Lineup';
      case 'JOURNAL':
        return 'Latest Dispatches';
      default:
        return null;
    }
  };

  return (
    <div
      id="side-drawer-modal"
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop */}
      <div
        id="drawer-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      />

      {/* Drawer Panel */}
      <aside
        id="drawer-panel"
        className="relative z-10 h-full w-full bg-white text-black border-l border-gray-200 flex flex-col justify-between shadow-2xl overflow-y-auto"
        style={{
          maxWidth: 'var(--drawer-max)',
          padding: 'var(--drawer-pad)',
        }}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2
                id="drawer-title"
                className="font-orbitron font-bold uppercase tracking-wider text-lg"
              >
                {getDrawerHeaderTitle()}
              </h2>
              {getDrawerSubtitle() && (
                <p className="text-gray-400 font-jakarta uppercase tracking-widest text-[10px] mt-0.5">
                  {getDrawerSubtitle()}
                </p>
              )}
            </div>
            <button
              id="drawer-close-btn"
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-black transition-colors rounded-sm hover:bg-gray-100"
              aria-label="Close drawer"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Drawer Body Contents */}
          <div className="py-6 space-y-6">
            {/* SHOP / CATALOG */}
            {activeDrawer === 'SHOP' && (
              <div className="space-y-4">
                {SHOP_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    id={`shop-item-${item.id}`}
                    className="flex items-center justify-between py-3 border-b border-gray-100 group"
                  >
                    <div className="space-y-1 pr-3">
                      <span className="inline-block text-gray-400 font-jakarta tracking-wider uppercase text-[10px]">
                        {item.tag}
                      </span>
                      <h3 className="font-orbitron text-xs font-semibold tracking-wide text-black group-hover:text-gray-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-jakarta text-xs text-gray-500 font-medium">
                        {item.priceFormatted}
                      </p>
                    </div>
                    <button
                      id={`add-to-cart-${item.id}`}
                      onClick={() => onAddToCart(item)}
                      className="px-3 py-1.5 border border-black text-black hover:bg-black hover:text-white font-jakarta text-[11px] font-semibold tracking-widest uppercase transition-all duration-150 rounded-xs shrink-0"
                    >
                      ADD
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* COLLECTIONS / ARCHIVE 2026 */}
            {activeDrawer === 'COLLECTIONS' && (
              <div className="space-y-6">
                {COLLECTION_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    id={`collection-item-${item.id}`}
                    className="space-y-1.5 pb-4 border-b border-gray-100"
                  >
                    <span className="text-gray-400 font-jakarta tracking-widest uppercase text-[10px] font-semibold">
                      {item.series}
                    </span>
                    <h3 className="font-orbitron text-xs font-bold tracking-wider text-black">
                      {item.title}
                    </h3>
                    <p className="font-jakarta text-xs text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* JOURNAL / EDITORIAL */}
            {activeDrawer === 'JOURNAL' && (
              <div className="space-y-5">
                {JOURNAL_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    id={`journal-item-${item.id}`}
                    className="space-y-1.5 pb-4 border-b border-gray-100 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-gray-400 font-jakarta tracking-widest uppercase text-[10px]">
                      <span>{item.date}</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="font-orbitron text-xs font-bold tracking-wide text-black group-hover:text-gray-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            )}

            {/* CART / SHOPPING BAG */}
            {activeDrawer === 'CART' && (
              <div>
                {cart.length === 0 ? (
                  <div
                    id="empty-cart-state"
                    className="py-16 text-center flex flex-col items-center justify-center space-y-3"
                  >
                    <ShoppingBag
                      className="text-gray-300"
                      size={36}
                      strokeWidth={1.2}
                    />
                    <p className="font-jakarta text-xs text-gray-500 uppercase tracking-wider">
                      Your shopping bag is empty.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((cartEntry) => (
                      <div
                        key={cartEntry.item.id}
                        id={`cart-item-${cartEntry.item.id}`}
                        className="flex items-center justify-between py-3 border-b border-gray-100"
                      >
                        <div className="space-y-0.5">
                          <h3 className="font-orbitron text-xs font-semibold text-black">
                            {cartEntry.item.title}
                          </h3>
                          <p className="font-jakarta text-xs text-gray-500">
                            {cartEntry.item.priceFormatted}{' '}
                            {cartEntry.quantity > 1 &&
                              `× ${cartEntry.quantity}`}
                          </p>
                        </div>
                        <button
                          id={`remove-item-${cartEntry.item.id}`}
                          onClick={() => onRemoveFromCart(cartEntry.item.id)}
                          className="text-gray-400 hover:text-black p-1 transition-colors text-xs uppercase font-jakarta font-medium flex items-center gap-1"
                          title="Remove item"
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                          <span className="text-[10px]">Remove</span>
                        </button>
                      </div>
                    ))}
                    <div className="pt-4 flex justify-between items-center text-xs font-orbitron font-semibold">
                      <span>TOTAL</span>
                      <span>${totalCartPrice}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-gray-100">
          {activeDrawer === 'CART' && cart.length > 0 ? (
            <button
              id="checkout-now-btn"
              onClick={onCheckout}
              className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-3 px-4 flex items-center justify-center gap-2 font-jakarta uppercase tracking-widest text-xs font-bold rounded-none"
            >
              <span>CHECKOUT NOW</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <p
              id="drawer-footer-brand-text"
              className="text-center font-jakarta uppercase text-[10px] text-gray-400 tracking-widest"
            >
              LGPSM © 2026 — FUTURE FORWARD FASHION
            </p>
          )}
        </div>
      </aside>
    </div>
  );
};
