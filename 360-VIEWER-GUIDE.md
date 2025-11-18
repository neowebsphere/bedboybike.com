# 360° Viewer Guide / Руководство по 360° Просмотру

## How It Works / Как это работает

The 360° viewer allows users to interactively rotate and view motorcycle images from different angles.

360° просмотрщик позволяет пользователям интерактивно вращать и просматривать изображения мотоциклов с разных ракурсов.

---

## Features / Возможности

### 1. **Interactive Rotation / Интерактивное вращение**
- **Desktop:** Click and drag the image left/right to rotate
- **Mobile:** Swipe left/right to rotate
- **Keyboard:** ← → Arrow keys
- **Mouse Wheel:** Scroll to rotate (without Ctrl)
- **Рабочий стол:** Кликните и тяните изображение влево/вправо для вращения
- **Мобильные:** Свайпайте влево/вправо для вращения
- **Клавиатура:** ← → Стрелки
- **Колесико мыши:** Прокручивайте для вращения (без Ctrl)

### 2. **Zoom In/Out / Увеличение/Уменьшение** 🆕
- **Buttons:** Click zoom buttons (-, reset, +)
- **Keyboard:** +/- keys, ↑/↓ arrows, 0 to reset
- **Mouse Wheel:** Ctrl + Scroll to zoom
- **Zoom Range:** 50% - 300%
- **Кнопки:** Кликайте на кнопки zoom (-, сброс, +)
- **Клавиатура:** +/- клавиши, ↑/↓ стрелки, 0 для сброса
- **Колесико мыши:** Ctrl + Прокрутка для zoom
- **Диапазон zoom:** 50% - 300%

### 3. **Fullscreen Mode / Полноэкранный режим** 🆕
- **Button:** Click fullscreen button
- **Keyboard:** Press F key
- **Exit:** Press F again or Esc key
- **Кнопка:** Кликните кнопку fullscreen
- **Клавиатура:** Нажмите клавишу F
- **Выход:** Нажмите F снова или Esc

### 4. **Inertia / Инерция**
- Smooth momentum-based rotation when you release the drag
- Плавное вращение с инерцией при отпускании

### 5. **Control Buttons / Кнопки управления**
- ⟲ Rotate left / Повернуть влево
- ⟳ Auto-rotate / Автовращение
- ⟳ Rotate right / Повернуть вправо
- 🔍- Zoom out / Уменьшить
- 🔍 Reset zoom / Сбросить zoom
- 🔍+ Zoom in / Увеличить
- ⛶ Fullscreen / Полноэкранный режим

### 6. **Frame Counter / Счетчик кадров**
- Shows current frame and total frames (e.g., "2 / 4")
- Показывает текущий кадр и общее количество (например, "2 / 4")

### 7. **Zoom Indicator / Индикатор zoom** 🆕
- Shows current zoom level (e.g., "150%")
- Auto-hides when at 100%
- Показывает текущий уровень zoom (например, "150%")
- Автоматически скрывается при 100%

### 8. **Drag Hint / Подсказка**
- Animated hint appears for 3 seconds to guide users
- Анимированная подсказка появляется на 3 секунды

### 9. **Keyboard Shortcuts / Горячие клавиши** 🆕
See full keyboard shortcuts list below / См. полный список горячих клавиш ниже

---

## How to Use / Как использовать

### For Users / Для пользователей

1. **Open a bike modal** / Откройте модальное окно мотоцикла
   - Click on any motorcycle card in the gallery
   - Кликните на любую карточку мотоцикла в галерее

2. **Activate 360° View** / Активируйте 360° просмотр
   - Click the "360° View" button below the thumbnails
   - Кликните кнопку "360° View" под миниатюрами

3. **Interact with the viewer** / Взаимодействуйте с просмотрщиком
   - Drag to rotate / Тяните для вращения
   - Use control buttons / Используйте кнопки управления
   - Enable auto-rotate if desired / Включите автовращение при желании

4. **Return to standard view** / Вернитесь к стандартному просмотру
   - Click the "Standard View" button
   - Кликните кнопку "Standard View"

---

## Keyboard Shortcuts / Горячие клавиши

Complete list of keyboard controls:

| Key | Action | Клавиша | Действие |
|-----|--------|---------|----------|
| ← | Rotate left | ← | Повернуть влево |
| → | Rotate right | → | Повернуть вправо |
| ↑ | Zoom in | ↑ | Увеличить |
| ↓ | Zoom out | ↓ | Уменьшить |
| + or = | Zoom in | + или = | Увеличить |
| - or _ | Zoom out | - или _ | Уменьшить |
| 0 | Reset zoom to 100% | 0 | Сбросить zoom на 100% |
| F | Toggle fullscreen | F | Переключить полноэкранный режим |
| Space | Toggle auto-rotate | Пробел | Переключить автовращение |
| Esc | Exit fullscreen | Esc | Выйти из полноэкранного режима |

**Mouse Wheel / Колесико мыши:**
- **Scroll** - Rotate motorcycle / Вращать мотоцикл
- **Ctrl + Scroll** - Zoom in/out / Увеличить/уменьшить

---

## Configuration Options / Опции конфигурации

You can customize the viewer by passing options to the `Viewer360` constructor:

Вы можете настроить просмотрщик, передав опции в конструктор `Viewer360`:

```javascript
new Viewer360('containerId', images, {
  // Rotation options
  sensitivity: 0.5,           // Drag sensitivity (0.1 - 2.0)
  autoRotate: false,          // Enable auto-rotation
  autoRotateSpeed: 0.5,       // Auto-rotation speed (0.1 - 5.0)
  inertia: true,              // Enable inertia/momentum
  inertiaFriction: 0.92,      // Inertia friction (0.8 - 0.99)
  
  // UI options
  showHint: true,             // Show drag hint
  hintDuration: 3000,         // Hint duration in milliseconds
  preloadImages: true,        // Preload all images
  
  // NEW: Feature toggles
  enableZoom: true,           // Enable zoom functionality
  enableFullscreen: true,     // Enable fullscreen mode
  enableKeyboard: true,       // Enable keyboard controls
  enableMouseWheel: true      // Enable mouse wheel rotation/zoom
});
```

---

## Browser Support / Поддержка браузеров

✅ Chrome/Edge (Latest)  
✅ Firefox (Latest)  
✅ Safari (Latest)  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  

---

## Performance Tips / Советы по производительности

### For optimal performance / Для оптимальной производительности:

1. **Image Resolution / Разрешение изображений**
   - Recommended: 1920x1080 or lower
   - Рекомендуется: 1920x1080 или ниже

2. **Number of Frames / Количество кадров**
   - Optimal: 4-8 frames for smooth rotation
   - Оптимально: 4-8 кадров для плавного вращения
   - More frames = smoother rotation but larger file size
   - Больше кадров = плавнее вращение, но больше размер файлов

3. **Image Format / Формат изображений**
   - Use WebP for better compression (50% smaller than JPG)
   - Используйте WebP для лучшего сжатия (на 50% меньше чем JPG)
   - Fallback to JPG for compatibility
   - Fallback на JPG для совместимости

---

## Technical Details / Технические детали

### Files / Файлы:
- `js/viewer360.js` - Main viewer class / Основной класс просмотрщика
- `js/modal.js` - Integration with modal window / Интеграция с модальным окном
- `css/style.css` - Viewer styles / Стили просмотрщика
- `css/responsive.css` - Mobile responsive styles / Адаптивные стили для мобильных

### Key Features Implementation / Реализация ключевых функций:
- **Drag & Drop:** Mouse and touch event handlers
- **Rotation:** Frame calculation based on drag distance
- **Inertia:** RequestAnimationFrame with friction decay
- **Auto-rotate:** setInterval with configurable speed
- **Preloading:** Image preloading for smooth transitions

---

## Troubleshooting / Устранение неполадок

### Issue: Images not loading / Проблема: Изображения не загружаются
**Solution:** Check that image paths in `motorcycles-data.js` are correct
**Решение:** Проверьте, что пути к изображениям в `motorcycles-data.js` правильные

### Issue: Rotation is too fast/slow / Проблема: Вращение слишком быстрое/медленное
**Solution:** Adjust the `sensitivity` option in viewer initialization
**Решение:** Настройте опцию `sensitivity` при инициализации просмотрщика

### Issue: Viewer not appearing / Проблема: Просмотрщик не появляется
**Solution:** 
1. Check browser console for JavaScript errors
2. Ensure `viewer360.js` is loaded before `modal.js`
3. Verify that the bike has images in the data

**Решение:**
1. Проверьте консоль браузера на наличие ошибок JavaScript
2. Убедитесь, что `viewer360.js` загружается перед `modal.js`
3. Проверьте, что у мотоцикла есть изображения в данных

---

## Future Enhancements / Будущие улучшения

### ✅ Implemented / Реализовано:
- ✅ Zoom in/out functionality / Функция увеличения/уменьшения
- ✅ Full-screen mode / Полноэкранный режим
- ✅ Keyboard navigation / Навигация с клавиатуры
- ✅ Mouse wheel rotation/zoom / Вращение/zoom колесиком мыши

### 🔮 Potential future features / Потенциальные будущие функции:
- Touch gestures (pinch to zoom, two-finger rotation)
- 360° vertical rotation (up/down)
- Hotspots/markers on specific angles
- Compare mode (side-by-side bikes)
- Share button (snapshot current angle)
- 360° panorama support
- VR mode support
- Animation recording

Потенциальные функции для добавления:
- Тач-жесты (pinch для zoom, вращение двумя пальцами)
- Вертикальное вращение 360° (вверх/вниз)
- Горячие точки/маркеры на определенных углах
- Режим сравнения (байки рядом)
- Кнопка "Поделиться" (скриншот текущего угла)
- Поддержка 360° панорам
- Поддержка VR режима
- Запись анимации

---

## License / Лицензия

This viewer is part of the Bad Boy Bike website project.

Этот просмотрщик является частью проекта веб-сайта Bad Boy Bike.

---

**Enjoy exploring motorcycles in 360°!** 🏍️  
**Наслаждайтесь просмотром мотоциклов в 360°!** 🏍️

