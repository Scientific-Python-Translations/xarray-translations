import { t } from "@lingui/macro";
export const Libraries = [
  {
    name: t`NumPy`,
    description:
      t`NumPy is the fundamental package for array computing with Python.`,
    url: 'https://numpy.org',
    repo: 'https://github.com/numpy/numpy',
    logo: t`/libraries/numpy_logo.svg`,
  },
  {
    name: t`Dask`,
    description:
      t`Distributed arrays and advanced parallelism for analytics, enabling performance at scale.`,
    url: 'https://dask.org/',
    repo: 'https://github.com/dask/dask',
    logo: t`/libraries/dask_horizontal.svg`,
  },
  {
    name: t`CuPy`,
    description:
      t`NumPy-compatible array library for GPU-accelerated computing with Python.`,
    url: 'https://cupy.chainer.org/',
    repo: 'https://github.com/cupy/cupy',
    logo: t`/libraries/cupy_logo_1000px.png`,
  },
  {
    name: t`Zarr`,
    description:
      t`An implementation of chunked, compressed, N-dimensional arrays for Python.`,
    url: 'http://zarr.readthedocs.io/',
    repo: 'https://github.com/zarr-developers/zarr-python',
    logo: t`/libraries/zarr-pink-stacked.svg`,
  },
  {
    name: t`Sparse`,
    description: t`Sparse multi-dimensional arrays for the PyData ecosystem`,
    url: 'https://sparse.pydata.org/',
    repo: 'https://github.com/pydata/sparse',
    logo: t`/libraries/sparse-logo.png`,
  },
  {
    name: t`Pint`,
    description: t`Operate and manipulate physical quantities in Python`,
    url: 'http://pint.readthedocs.org/',
    repo: 'https://github.com/hgrecco/pint',
    logo: t`/libraries/pint-logo-full.jpg`,
  },
]
