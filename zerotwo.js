const PROCESSED_ATTR = "data-zerotwo-processed";
const OVERLAY_ATTR = "data-zerotwo-overlay";

function getImg() {
  return browser.runtime.getURL(
    "content/zero-two-" + (Math.floor(Math.random() * 6) + 1) + ".png",
  );
}

function canProcessImage(img) {
  return (
    img instanceof HTMLImageElement &&
    !img.hasAttribute(PROCESSED_ATTR) &&
    !img.hasAttribute(OVERLAY_ATTR)
  );
}

function layer(img) {
  try {
    if (!canProcessImage(img)) return false;

    const parent = img.parentElement;
    const width = img.offsetWidth;
    const height = img.offsetHeight;

    if (!parent || width === 0 || height === 0) return false;

    const computedParentStyle = window.getComputedStyle(parent);
    if (computedParentStyle.position === "static") {
      parent.style.position = "relative";
    }

    const layerImg = document.createElement("img");
    layerImg.setAttribute(OVERLAY_ATTR, "true");
    layerImg.alt = "";
    layerImg.src = getImg();
    layerImg.style.position = "absolute";
    layerImg.style.left = img.offsetLeft + "px";
    layerImg.style.top = img.offsetTop + "px";
    layerImg.style.width = width + "px";
    layerImg.style.height = height + "px";
    layerImg.style.pointerEvents = "none";
    layerImg.style.objectFit = "cover";

    const zIndex = window.getComputedStyle(img).getPropertyValue("z-index");
    layerImg.style.zIndex = zIndex === "auto" ? "1" : zIndex;

    layerImg.onerror = () => {
      layerImg.remove();
      img.removeAttribute(PROCESSED_ATTR);
    };

    img.setAttribute(PROCESSED_ATTR, "true");
    parent.appendChild(layerImg);
    return true;
  } catch (error) {
    console.error("Error layering image:", error);
    return false;
  }
}

function processRoot(root) {
  if (!root) return 0;

  let processed = 0;

  if (root instanceof HTMLImageElement && layer(root)) {
    processed++;
  }

  if (root.querySelectorAll) {
    for (const img of root.querySelectorAll("img")) {
      if (layer(img)) {
        processed++;
      }
    }
  }

  return processed;
}

function processDocument() {
  processRoot(document.body);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", processDocument, {
    once: true,
  });
} else {
  processDocument();
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        processRoot(node);
      }
    }
  }
});

if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
} else {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    },
    { once: true },
  );
}
